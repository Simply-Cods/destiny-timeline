export function logCollapsed(label: string, title: string, ...props: any){
    console.groupCollapsed(`[${label}]`, title);
    for(const prop in props) {
        console.log(props[prop]);
    }
    console.groupEnd();
}