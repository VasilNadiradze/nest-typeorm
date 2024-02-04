import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  /*
     სვაგერი (https://swagger.io/docs/specification/2-0/what-is-swagger/).
     იხილეთ nest-cli.json ფაილიც.
  */ 
  const options = new DocumentBuilder()
  .setTitle('NestJS TypeOrm') // სვაგერის დოკუმენტის სათაური
  .setDescription('NestJS + Typeorm + MySql აპლიკაცია') // სვაგერის დოკუმენტის აღწერა
  .setVersion('1.0') // აპლიკაციის მიმდინარე ვერსია სვაგერის დოკუმენტში
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-documentation', app, document); // http://localhost:3000/api-documentation

  app.useGlobalPipes(new ValidationPipe()); // DTO ვალიდაციები

  await app.listen(3000); // პროექტი ჩაიტვირთება ამ მისამართზე : http://localhost:3000 
}
bootstrap();

/*
  main.ts ფაილი არის აპლიკაციის საკვანძო, შესავალი წერტილი. მისი დანიშნულებაა პროექტის ჩატვირთვა 
  და სერვერის ამოქოქვა :))  

  აპლიკაციის ჩატვირთვა: 
  
  როგორც წესი, main.ts ფაილი აიმპორტებს ხოლმე აპლიკაციის ძირითად მოდულს (ხშირად ეწოდება AppModule) 
  და შემდეგ აგენერირებს NestJS აპლიკაციის ეგზემპლიარს NestFactory კლასის გამოყენებით.

  აპლიკაციის კონფიგურაცია: 

  სერვერის ამოქოქვამდე შეიძლება დაგვჭირდეს სხვადასხვა კონფიგურაციული პარამეტრების, შუამავლების,
  ინტერფეისების, ფილტრების და ა.შ აღწერა, ეს ყველაფერი main.ts ფაილში ხდება ხოლმე ხშირად. მაგალითად
  ჩვენს შემთხვევაში : აღვწერეთ სვაგერთან სამუშაო პარამეტრები და ვალიდაციის მექანიზმი.
 
  სერვერის ამუშავება : 

  საჭირო პარამეტრების აღწერის შემდეგ main.ts ფაილი იძახებს app.listen() მეთოდს და ქოქავს HTTP სერვერს,
  ამის შემდეგ შესაძლებელი ხდება HTTP მოთხოვნების დამუშავება.  
*/
