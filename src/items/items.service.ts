import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);
    await this.entityManager.save(item);
  }

  async findAll() {
    try {
      const items = await this.itemsRepository.find();
      return items;
    } catch (error) {
      throw new Error('Failed to retrieve items from the database.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // const item = await this.itemsRepository.findOneBy({ id });
    // item.public = updateItemDto.public;
    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment(createCommentDto),
    // );
    // item.comments = comments;
    // await this.entityManager.save(item);

    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemsRepository.findOneBy({ id });
      item.name = updateItemDto.name;
      item.public = updateItemDto.public;      
      await entityManager.save(item);
    });
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}

/*
  როგორც წესი, სერვისებში ხდება ხოლმე ბიზნეს-ლოგიკისა და კონკრეტულ მოთხოვნასთან დაკავშირებული
  ოპერაციების აღწერა. ეს საშუალებას გვაძლევს დავწეროთ შედარებით მოქნილი და ადვილად აღქმადი კოდი.
  ასევე ხდება კონკრეტული ფუნქციონალების ინკაფსულაცია, განცალკევება და შესაძლებელია ამ ინკაფსულირებული
  ფუნქციონალების ნებისმიერ ადგილას გამოყენება დამოკიდებულებათა ინექციის გზით.  სწორედ ამ ინექციის
  შესაძლებლობას გამოხატავს სერვისზე წინ დართული @Injectable() დეკორატორი. ეს იმას ნიშნავს, რომ
  სერვისი შეგვიძლია წავიღოთ იქ სადაც გვინდა :))
*/
