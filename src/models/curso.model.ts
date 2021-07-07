import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';

@model()
export class Curso extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'date',
    required: true,
  })
  inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  termino: string;

  @property({
    type: 'number',
    default: 0,
  })
  qtdAlunos?: number;

  @belongsTo(() => Categoria)
  categoriaId: number;

  constructor(data?: Partial<Curso>) {
    super(data);
  }
}

export interface CursoRelations {
  // describe navigational properties here
}

export type CursoWithRelations = Curso & CursoRelations;
