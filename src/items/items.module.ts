import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Description, Item, Tag } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    Item,
    Description,
    Comment,
    Tag
  ])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

/*
  TypeORM (ORM - Object-Relational Mapping) არის რელაციურ ბაზებთან სამუშაო ბიბლიოთეკა, 
  რომელიც გამოიყენება TypeScript-სა და JavaScript-ში. 

  ძირითადი მახასიათებლები : 

    ORM - ანუ ობიექტ-რელაციური მაკავშირებელი : 

      ორმ-ის მეშვეობით შესაძლებელია მონაცემთა ბაზის ცხრილი დავაკავშიროთ TypeScript-ის 
      ან JavaScript-ის კლასთან. ერთი კონკრეტული კლასი იქნება ერთი კონკრეტული ცხრილის 
      წარმოდგენა, ხოლო ამ კლასის ობიექტები იქნებიან ცხრილში არსებული ჩანაწერების შესატყვისები. 
      ეს მიდგომა ძალიან აადვილებს ბაზებთან მუშაობას ვინაიდან, ფაქტიურად ობიექტებს ველაპარაკებით :)) 
      და აღარ გვიწევს მონაცემთა ბაზებთან სამუშაო ბრძანებების ხელით წერა. 

    Entity: 

      TypeORM-ში entity ეწოდება TypeScript-ის ან JavaScript-ის კლასს, რომელიც არის ბაზის 
      კონკრეტული ცხრილის წარმოდგენა. კლასის თითოეული თვისება (property) შეესაბამება ცხრილის
      კონკრეტულ ველს, ხოლო კლასის მეთოდების მეშვეობით შესაძლებელია აღიწეროს ცხრილთა შორის 
      ურთიერთკავშირები (relationships).

    რეპოზიტორები: 

      მონაცემთა ბაზებთან სამუშაო ოპერაციებისათვის TypeORM იყენებს საცავურ ანუ რეპოზიტორულ 
      მიდგომას, რეპოზიტორი პასუხისმგებელია სწორად და გამართულად შესრულდეს კონკრეტულ ცხრილთან (Entity)
      დაკავშირებული კონკრეტული ბრძანებები. რეპოზიტორები ხშირად გამოიყენება CRUD (Create, Read, Update, Delete) 
      ტიპის ოპერაციებთან.

    მიგრაციები და სიდერები : 

      TypeORM მხარს უჭერს მიგრაციებსა და სიდერებს, რაც საკმაოდ მნიშვნელოვანი მომენტია მონაცემთა
      ბაზებთან მუშაობისას (ინფორმაცია მიგრაციებისა და სიდერების შესახებ შეგიძლიათ იხილოთ 
      აქ : https://vnadiradze.ge/info/laravel/).

    ბრძანებათა კონსტრუქტორი :

      TypeORM-ში ჩაშენებულია ბრძანებათა კონსტრუქტორი (Query Builder), რომლის მეშვეობითაც 
      შესაძლებელია, საკმაოდ ჩახლართული SQL ბრძანებების მოკლედ, ლაკონურად და ლამაზად წერა.

    სხვადასხვა სისტემების მხარდაჭერა :

      TypeORM მხარს უჭერს რელაციური ბაზებთან სამუშაო სხვადასხვა სისტემებს (RDBMS - relational database
      management systems) :  PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.    
*/
