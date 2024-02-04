import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpException, 
  HttpStatus, 
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    try {
      const result = await this.itemsService.create(createItemDto);
      return { 
        message: 'პროდუქტი წარმატებით დაემატა', 
        data: result 
      };
    } catch (error) {
      throw new HttpException({ 
        message: 'სამწუხაროდ პროდუქტი ვერ დაემატა', error 
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const items = await this.itemsService.findAll();
      return { 
        success: true, 
        message: 'პროდუქტი წარმატებით ამოვიღეთ ბაზიდან' ,
        data: items, 
      };
    } catch (error) {
      throw new HttpException({ 
          success: false, 
          message: 'სამწუხაროდ პროდუქტი ვერ ამოვიღეთ ბაზიდან', 
          error: error.message 
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.itemsService.findOne(+id);
      return { 
        success: true, 
        data: result, 
        message: 'პროდუქტი წარმატებით მოიძებნა' 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { 
          success: false, 
          message: 'პროდუქტი ვერ მოიძებნა' 
        };
      } else {
        throw new InternalServerErrorException('სერვერული ხარვეზი');
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    try {
      await this.itemsService.update(+id, updateItemDto);
      return { 
        success: true, 
        message: 'პროდუქტი წარმატებით განახლდა' 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { 
          success: false, 
          message: 'პროდუქტი ვერ მოიძებნა' 
        };
      } else {
        throw new InternalServerErrorException('სერვერული ხარვეზი');
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.itemsService.remove(+id);
      return { 
        message: `პროდუქტი ID: ${id} წარმატებით წაიშალა`, 
        data: result 
      };
    } catch (error) {
      throw new HttpException(
        { 
          message: `პროდუქტი ID: ${id} ვერ წაიშალა`, 
          error 
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

/*
  NestJS-ში კონტროლერის მოვალეობაა შემომავალი HTTP მოთხოვნების დამუშავება. კონტროლერის რეგისტრაცია 
  ხდება @Controller დეკორატორის მეშვეობით, რომელზე გადაცემული პარამეტრიც განსაზღვრავს მიმდინარე მოდულის 
  შესაბამის ფრაგმენტს წვდომის წერტილებში (endpoints). მაგალითად ჩვენს შემთხვევაში : @Controller('items')
  ჩანაწერი ნიშნავს, რომ წვდომის წერტილებს ექნებათ შემდეგი სახე :

    http://localhost:3000/items
    http://localhost:3000/items/1

    ...

  კონტროლერის მეთოდები უზრუნველყოფენ კონკრეტული წვდომის წერტილების დამუშავებას. მეთოდს წინ ერთვის სპეციალური
  დეკორატორი, რომელიც განსაზღვრავს მოთხოვნის ტიპს. ეს დეკორატორებია : @Get, @Post, @Patch, @Put, @Delete.

  ისეთ მეთოდებში რომლებშიც საქმე გვაქვს, რომელიმე კონკრეტული ჩანაწერის დამუშავებასთან, ტიპის განმსაზღვრელ
  დეკორატორებს უნდა გადაეცეთ ამ ჩანაწერის იდენტიფიკატორი, მაგალითად განვიხილოთ კონკრეტული ჩანაწერის წვდომის
  წერტილი : 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    // ...
  }
  
  მოთხოვნის ტიპი : Patch, 
  წვდომის წერტილი : http://localhost:3000/items/1,
  პარამეტრები : @Param დეკორატორი განსაზღვრავს მოთხოვნის პარამეტრებს, ამ შემთხვევაში ჩანაწერის id-ს,
  მოთხოვნის ტანი : @Body() დეკორატორი განსაზღვრავს თუ რა ინფორმაცია უნდა გაიგზავნოს სერვერზე.

  კარგი პრაქტიკაა თუ კონტროლერში მოხდება მხოლოდ მარშრუტის აღწერა და მიღებული მოთხოვნის დამუშავება, 
  ბიზნეს-ლოგიკა და მოთხოვნასთან დაკავშირებული ოპერაციები კი შესრულდება სერვისებში.
*/
