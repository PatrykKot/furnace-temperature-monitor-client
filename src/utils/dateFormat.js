import moment from 'moment'

export function formatAddedDate(stringDate) {
    return moment(stringDate).format('YYYY-MM-DD HH:mm:ss')
}