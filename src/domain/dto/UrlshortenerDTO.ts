export class UrlshortenerDTO {
    url?: string;
    owner?: string;
    urlshort?: string;
    status?: Boolean;

    constructor(url: string, owner: string, urlshort: string, status: Boolean) {
        this.url = url;
        this.status = status;
        this.owner = owner;
        this.urlshort = urlshort;
    }
}
