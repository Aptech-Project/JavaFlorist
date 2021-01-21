const productFilter = (filterData, list) => {
  console.log(filterData);
  console.log(list)
  let filteredList = list.filter(item => {
    let matched = true
    Object.keys(item).some(key => {
      if (filterData.hasOwnProperty(key) || key == "price") {
        if (key != "price") {
          let itemValue = item[key].toString().toLowerCase()
          let filterDataValue = filterData[key].toString().toLowerCase()
          if (!itemValue.includes(filterDataValue)) {
            matched = false
          }
        } else {
          let min = filterData.min
          let max = filterData.max
          if (min != '' && max == '' && item[key] < min)
            matched = false
          if (min == '' && max != '' && item[key] > max) matched = false
          if (min != '' && max != '' && (item[key] < min || item[key] > max)) matched = false
        }
      }
    })
    if (matched) {
      return item
    }
  })
  console.log(filteredList)
  return (
    filteredList
  )
}

const productPagination = (products, activeIndex) => {
  let indexCount = []
  let index
  indexCount.push("PREV")
  for (index = 1; index <= products.length/6; index++) {
    indexCount.push(index)
  }
  if(products.length%3!=0){
    indexCount.push(index)
  }
  indexCount.push("NEXT")
  let start = (activeIndex-1)*6
  let end = activeIndex*6
  let paginatedProducts = products.slice(start, end)
  return {products : paginatedProducts, indexCount: indexCount}
}

export {productFilter, productPagination}