import { IsString, IsEmail, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    readonly name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    readonly password: string;

    @IsInt({ message: 'Age must be a number' })
    @Min(0, { message: 'Age must be a non-negative number' })
    readonly age: number;
}
