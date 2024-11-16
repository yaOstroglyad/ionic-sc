import { Component, Input } from '@angular/core';
import { EmptyStateConfig, GridColumnConfig, GridColumnType } from '../../model/grid-configs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-e-grid',
  templateUrl: './e-grid.component.html',
  styleUrls: ['./e-grid.component.scss'],
})
export class EGridComponent {
  @Input() tableData: Observable<any>;
  @Input() columnsConfig: GridColumnConfig[];
  @Input() emptyStateConfig: EmptyStateConfig;
  constructor() { }

  protected readonly GridColumnType = GridColumnType;
}
