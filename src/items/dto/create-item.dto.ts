import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { CreateDescriptionDto } from "./create-description.dto";
import { CreateTagDto } from "./create-tag.dto";

export class CreateItemDto {
    @ApiProperty({ 
        description: 'ნივთის დასახელება' ,
        example: 'iPhone 15 Pro'
    })
    @IsString()
    name: string;
    
    @ApiProperty({ 
        description: 'ხელმისაწვდომია თუ არა' ,
        example: true
    })
    @IsBoolean()
    public: boolean;

    description: CreateDescriptionDto;

    tags: CreateTagDto[];
}
