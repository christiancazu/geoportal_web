
import { SET_CURRENT_PAGE_ON_TABLE } from '@/types/mutations'

export default {
  methods: {
    /**
     * filtering data based on @param {Array} filterCriteriaProps
     *
     */
    filteredDataContext () {
      let textToSearchLowerCase = this.textToSearch.toLowerCase()
      const dataContextFiltered = this.dataContext.filter(itemContext => {
        for (let index = 0; index < this.criteriaLength; index++) {
          const criteriaParts = this.filterCriteriaProps[index].split('.')

          // used for criterias with format: (ex: author.name)
          if (criteriaParts[1]) {
            if (
              itemContext[criteriaParts[0]][criteriaParts[1]]
                .toLowerCase()
                .includes(textToSearchLowerCase)
            ) {
              return true
            }
          } else {
            if (
              itemContext[this.filterCriteriaProps[index]]
                .toLowerCase()
                .includes(textToSearchLowerCase)
            ) {
              return true
            }
          }
        }
      })

      // if have dataContextFiltered set as current page the first
      if (dataContextFiltered < this.dataContext)
        this.$store.commit(`${this.modalMain.storeBase}/${SET_CURRENT_PAGE_ON_TABLE}`, 1)

      return dataContextFiltered
    }
  }
}
