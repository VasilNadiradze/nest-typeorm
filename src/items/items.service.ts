import { 
  BadRequestException, 
  Injectable, 
  InternalServerErrorException, 
  NotFoundException 
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Description, Item, Tag } from './entities';
import { CreateCommentDto, CreateItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {

      // დავაგენერიროთ პროდუქტის აღწერა 
      const description = new Description({
        ...createItemDto.description, // პროდუქტის შექმნისას მოთხოვნაში ჩაიდება აღწერაც შესაბამისი ველებით : description და rating
      });

      // შექმნისას მოთხოვნაში გამოგზავნილი ყველა ტეგისათვის შევქმნათ ახალი ტეგი
      const tags = createItemDto.tags.map(
        (createTagDto) => new Tag(createTagDto),
      );

      const item = new Item({
        ...createItemDto,
        description,
        comments: [], // შექმნისას კომენტარები არ ექნება, ამიტომ ვუთითებთ ცარიელ მასივს
        tags: tags
      });

      const result =await this.entityManager.save(item);

      return result;
    } catch (error) {
      throw new Error('პროდუქტი ვერ დაემატა ბაზაში');
    }
  }

  async findAll() {
    try {
      const items = await this.itemsRepository.find();
      return items;
    } catch (error) {
      throw new Error('ვერ მოხერხდა პროდუქტის ამოღება ბაზიდან');
    }
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOne({ 
      where: { id } ,
      // ჩაიტვირთება რელაციებთან ერთად
      relations: { 
        description: true,
        comments: true,
        tags: true
      } 
    });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const item = await this.itemsRepository.findOneBy({ id });

        if (!item) {
          throw new NotFoundException('პროდუქტი ვერ მოიძებნა');
        }

        item.name = updateItemDto.name;
        item.public = updateItemDto.public;

        // თუ მოთხოვნაში ჩადებულია კომენტარებიც
        if (updateItemDto.comments) {
          const comments = updateItemDto.comments.map(
            (createCommentDto: CreateCommentDto) => new Comment(createCommentDto),
          );
          item.comments = comments;
        }

        await entityManager.save(item);
      });

      return { success: true, message: 'პროდუქტი წარმატებით განახლდა' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        // Internal server error
        throw new InternalServerErrorException('სერვერული ხარვეზი');
      }
    }
  }

  async remove(id: number) {
    const deleteResult = await this.itemsRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`პროდუქტი ID: ${id} ვერ მოიძებნა`);
    }

    return `პროდუქტი ID: ${id} წარმატებით წაიშალა`;
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
