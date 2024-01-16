let timeout : number =0
export const debounce = (cb : Function , time : number) => {

    clearTimeout(timeout)
    timeout = setTimeout(cb, time)
}
