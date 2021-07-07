import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Curso, CursoRelations, Categoria} from '../models';
import {CategoriaRepository} from './categoria.repository';

export class CursoRepository extends DefaultCrudRepository<
  Curso,
  typeof Curso.prototype.id,
  CursoRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof Curso.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Curso, dataSource);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
