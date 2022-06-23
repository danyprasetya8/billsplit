const PREFIX = '/.netlify/functions'

const api = {
  bill: PREFIX + '/bill',
  billDetail: PREFIX + '/bill-detail',
  menu: PREFIX + '/menu',
  place: PREFIX + '/place',
  placeDetail: PREFIX + '/place-detail'
}

export default api
