import {repository} from '@loopback/repository';
import {
  get, getModelSchemaRef, response
} from '@loopback/rest';
import {Categoria} from '../models';
import {CategoriaRepository} from '../repositories';

export class MigrateController {
  constructor(
    @repository(CategoriaRepository)
    public categoriaRepository : CategoriaRepository,
  ) {}

  @get('/migrate/execute')
  @response(200, {
    description: 'Executa seeds',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categoria, {includeRelations: true}),
        },
      },
    }
  })
  async execute(): Promise<Object> {

    const categorias : Categoria[] = [
      new Categoria({codigo: '1', descricao:'Comportamental'}),
      new Categoria({codigo: '2', descricao:'Programação'}),
      new Categoria({codigo: '3', descricao:'Qualidade'}),
      new Categoria({codigo: '4', descricao:'Processos'})
    ];

    for( const categoria of categorias){
      const  find = await this.find(categoria);
      if(!find.length){
      await this.categoriaRepository.create(categoria);
    }
    }

    return this.categoriaRepository.find();
  }

  find(categoria: Categoria){
   return  this.categoriaRepository.find({
     where:{
       and :[
         {descricao: categoria.descricao},
         {codigo: categoria.codigo}
       ]
     }
   });
  }

}
