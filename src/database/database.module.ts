import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow('MYSQL_HOST'),
                port: configService.getOrThrow('MYSQL_PORT'),
                database: configService.getOrThrow('MYSQL_DATABASE'),
                username: configService.getOrThrow('MYSQL_USERNAME'),
                password: configService.getOrThrow('MYSQL_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}

/*
    ორიოდ სიტყვით synchronize პარამეტრის შესახებ 

    synchronize: boolean პარამეტრი განსაზღვრავს მოახდინოს თუ არა TypeORM-მა ბაზის ცხრილების 
    ავტომატური განახლება entity კლასებში შეტანილი ცვლილებების მიხედვით. როდესაც პარამეტრის 
    მნიშვნელობად მითითებულია true, თუ რომელიმე entity-ში შევიტანთ ცვლილებას (მაგალითად)
    დავამატებთ ახალ ველს) ან შევქმნით ახალ entity კლასს, TypeORM ავტომატურად ასახავს ამ
    ცვლილებებს ბაზაში, ანუ მოხდება კოდისა და ბაზის სინქრონიზაცია.

    ტესტირებისა და პროექტწარმოების პროცესში ამ პარამეტრის ჩართვა საკმაოდ მოსახერხებელია,
    რადგან არ მოგვიწევს ცხრილებისა და ველების ხელით შექმნა, თუმცა პროექტის გაშვების შემდეგ,
    გამომდინარე იქიდან, რომ ამ დროს მეტი კონტროლი და ყურადღებაა საჭირო ცხრილებთან მიმართებაში,
    რეკომენდებულია თუ ამ პარამეტრს გავთიშავთ (!!!) რათა თავიდან ავიცილოთ არეულობა ბაზის სტრუქტურაში.
    ასევე აღარ იარსებებს ინფორმაციის დაკარგვის შანსი : მაგალითად თუ რომელიმე ველს შეცდომით წავშლით 
    entity კლასში, ეს ველი ბაზაშიც წაიშლება (!!!).
*/