import { Equals, IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsBoolean()
  @Equals(true, { message: '必须同意用户协议' })
  termsAccepted!: boolean;

  @IsBoolean()
  @Equals(true, { message: '必须同意隐私协议' })
  privacyAccepted!: boolean;
}
