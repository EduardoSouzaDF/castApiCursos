import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Categoria, Curso} from '../models';
import {CursoRepository} from '../repositories';

@authenticate('jwt')
export class CursoCategoriaController {
  constructor(
    @repository(CursoRepository)
    public cursoRepository: CursoRepository,
  ) {}

  @get('/cursos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to Curso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async getCategoria(
    @param.path.string('id') id: typeof Curso.prototype.id,
  ): Promise<Categoria> {
    return this.cursoRepository.categoria(id);
  }
}
