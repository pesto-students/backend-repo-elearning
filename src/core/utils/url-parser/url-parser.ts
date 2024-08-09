export class UrlParser {
    private url: URL;

    constructor(uri: string, prefix: boolean = true){
        if(prefix){
            if(uri?.startsWith('/')) uri = "http://localhost:4000" + uri;
            else uri = "http://localhost:4000/" + uri;
        }

        this.url = new URL(uri);
    }

    getOrigin(): string {
        return this.url.origin;
    }

    getPathParams(): string {
        return `${this.url.pathname}`;
    }

    getQueryParams(): URLSearchParams {
        return new URLSearchParams(`${this.url.searchParams}`);
    }
}