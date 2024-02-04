import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { CreateCommentDto } from './create-comment.dto';
import { CreateTagDto } from './create-tag.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    comments: CreateCommentDto[];
    tags: CreateTagDto[];
}

/*
    PartialType ფუნქცია გვეხმარება უკვე არსებული რომელიმე DTO-ს აუცილებელი 
    (required) ველები ვაქციოთ ნებაყოფლობით (optional) ველებად. 
    
    მაგალითად CreateItemDto კლასში გვაქვს ორი აუცილებელი ველი : name და public.
    ახლა ვიმყოფებით Item მოდელის განახლების DTO-ში და ბუნებრივია შეიძლება მოხდეს 
    ისე, რომ დაგვჭირდეს, მაგალითად მხოლოდ public ველის განახლება, ანუ მოდელის 
    ნაწილობრივი (partial) განახლება.  

    PartialType ფუნქციის გარეშე update-item-.dto.ts ფაილში მოგვიწევდა ასეთი კოდის დაწერა : 

    import { IsBoolean, IsOptional, IsString } from "class-validator";

    export class UpdateItemDto {
        @IsString()
        @IsOptional()
        name: string;
        
        @IsBoolean()
        @IsOptional()
        public: boolean;
    }

    ახლა ორი ველი გვაქვს და ეს დიდი ტრაგედია არ არის :)) მაგრამ შეიძლება გვქონდეს 25 ველი
    და იმისათვის, რომ სისტემამ კონკრეტული ველები ნებაყოფლობით ველებად აღიქვას, სათითაოდ უნდა 
    ვუწეროთ @IsOptional() დეკორატორი.
*/
