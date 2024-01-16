export const truncate = (value: string , valueLength: number) =>{
    if (value.length > valueLength) {
        return value.substring(0, valueLength) + '...';
    } else {
        return value;
    }
}