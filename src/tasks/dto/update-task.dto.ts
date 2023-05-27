import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isChecked?: boolean;
}
