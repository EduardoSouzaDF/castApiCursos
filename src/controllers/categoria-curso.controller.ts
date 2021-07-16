import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Categoria, Curso} from '../models';
import {CategoriaRepository} from '../repositories';

@authenticate('jwt')
export class CategoriaCursoController {
  constructor(
    @repository(CategoriaRepository)
    protected categoriaRepository: CategoriaRepository,
  ) {}

  @get('/categorias/{id}/cursos', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Curso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Curso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Curso>,
  ): Promise<Curso[]> {
    return this.categoriaRepository.cursos(id).find(filter);
  }

  @post('/categorias/{id}/cursos', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Curso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {
            title: 'NewCursoInCategoria',
            exclude: ['id'],
            optional: ['categoriaId'],
          }),
        },
      },
    })
    curso: Omit<Curso, 'id'>,
  ): Promise<Curso> {
    return this.categoriaRepository.cursos(id).create(curso);
  }

  @patch('/categorias/{id}/cursos', {
    responses: {
      '200': {
        description: 'Categoria.Curso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {partial: true}),
        },
      },
    })
    curso: Partial<Curso>,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.categoriaRepository.cursos(id).patch(curso, where);
  }

  @del('/categorias/{id}/cursos', {
    responses: {
      '200': {
        description: 'Categoria.Curso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.categoriaRepository.cursos(id).delete(where);
  }
}
