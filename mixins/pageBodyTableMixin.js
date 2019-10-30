import BasePageActions from '@/components/base/BasePageActions'
import BaseBtnConfirm from "@/components/base/BaseBtnConfirm"

export default {
  components: {
    BasePageActions,
    BaseBtnConfirm
  },

  filters: {
    /**
     * shrink text if is major that 16 characters
     * to prevent long heights of rows on table
     * 
     * @param {String} text 
     */
    $_pageBodyTableMixin_shrinkText (text) {
      return text.length > 16 ? `${text.substring(0, 16)}<i class="fas fa-ellipsis-h"></i>` : text
    }
  }
}