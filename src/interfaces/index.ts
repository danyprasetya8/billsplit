import { GetMenuWebResponse } from '@/interfaces/response'

export interface DropdownItem {
  id: string,
  value: string
}

export interface SelectedMenu extends GetMenuWebResponse {
  quantity: number
}
