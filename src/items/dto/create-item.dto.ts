import { IsBoolean, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    name: string;
    
    @IsBoolean()
    public: boolean;
}
