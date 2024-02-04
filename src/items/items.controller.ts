import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll() {
    try {
      const items = await this.itemsService.findAll();
      return { 
        success: true, 
        message: 'Items retrieved successfully' ,
        data: items, 
      };
    } catch (error) {
      throw new HttpException({ 
          success: false, 
          message: 'Failed to retrieve items', 
          error: error.message 
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
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
