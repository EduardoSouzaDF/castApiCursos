import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Curso} from '../models';
import {CursoRepository} from './curso.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly cursos: HasManyRepositoryFactory<Curso, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CursoRepository') protected cursoRepositoryGetter: Getter<CursoRepository>,
  ) {
    super(Categoria, dataSource);
    this.cursos = this.createHasManyRepositoryFactoryFor('cursos', cursoRepositoryGetter,);
    this.registerInclusionResolver('cursos', this.cursos.inclusionResolver);
  }
}
