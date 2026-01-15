import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  branchCode?: string;
  permissions: string[];
}

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
  private readonly REFRESH_SECRET = process.env.REFRESH_SECRET || 'default-refresh';
  private readonly ACCESS_TOKEN_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';

  /**
   * User login
   */
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      await this.logAuditEvent(user.id, 'LOGIN_FAILED', { email });
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await this.logAuditEvent(user.id, 'LOGIN_SUCCESS', { email });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        branchCode: user.branchCode,
        permissions: this.getPermissionsByRole(user.role),
      },
    };
  }

  /**
   * Register new user (admin only)
   */
  async register(data: {
    email: string;
    password: string;
    name: string;
    role: Role;
    branchCode?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
        branchCode: data.branchCode,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  /**
   * Generate access token
   */
  private generateAccessToken(user: any): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      branchCode: user.branchCode,
      permissions: this.getPermissionsByRole(user.role),
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
      issuer: 'crm-bank-sumut',
    });
  }

  /**
   * Generate refresh token
   */
  private async generateRefreshToken(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, this.REFRESH_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    });

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return token;
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken: string) {
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, this.REFRESH_SECRET) as any;
    } catch {
      throw new Error('Invalid refresh token');
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new Error('Refresh token expired or invalid');
    }

    const accessToken = this.generateAccessToken(storedToken.user);
    return { accessToken };
  }

  /**
   * Logout
   */
  async logout(refreshToken: string) {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
  }

  /**
   * Get permissions by role
   */
  private getPermissionsByRole(role: Role): string[] {
    const rolePermissions: Record<Role, string[]> = {
      ADMIN: ['*'],
      DIRECTOR: ['view:dashboard', 'view:customers', 'view:reports', 'view:analytics'],
      SUPERVISOR: ['view:dashboard', 'view:customers', 'view:cases', 'assign:cases', 'escalate:cases'],
      AGENT: ['view:dashboard', 'search:customers', 'view:customers', 'create:cases', 'update:cases'],
      RM: ['view:dashboard', 'view:customers', 'manage:leads', 'create:activities', 'view:analytics'],
      MARKETING: ['view:dashboard', 'create:campaigns', 'view:campaigns', 'view:segments'],
      COMPLIANCE: ['view:audit', 'export:audit', 'view:consent', 'view:reports'],
      VIEWER: ['view:dashboard'],
    };
    return rolePermissions[role] || [];
  }

  /**
   * Audit log helper
   */
  private async logAuditEvent(userId: string, action: string, details: any) {
    await prisma.auditLog.create({
      data: { userId, action, resource: 'AUTH', details },
    });
  }
}

export const authService = new AuthService();
