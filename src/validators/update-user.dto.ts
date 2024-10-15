import { IsOptional, IsString, IsEmail, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    readonly name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    readonly email?: string;

    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    readonly password?: string;

    @IsOptional()
    @IsInt({ message: 'Age must be a number' })
    @Min(0, { message: 'Age must be a non-negative number' }) 
    readonly age?: number;
}
