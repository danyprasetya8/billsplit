interface BillDetailGroupedByPersonMenu {
  id: string,
  name: string,
  price: number
}

export interface BillDetailGroupedByPerson {
  _id: string,
  menus: BillDetailGroupedByPersonMenu[]
}
