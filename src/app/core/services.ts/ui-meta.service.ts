import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

  /**
   * Angular Meta tag service to help us with setting up the tags for the application and improve the SEO
   *
   */
@Injectable({
    providedIn:'root'
})
export class UiMetaService {

    private appColor = '#1976d2';
    private appImage = '/assets/icons/icon-72x72.png';
    private appTitle = 'Blog';
    private appDescription = 'You can find a certain blog post here and read it';
    private twitter_publisher_handle = "@";
    private baseUrl = environment.baseUrl;
    constructor(private meta: Meta , private title: Title) {

    }


    public setMetaData(config) {
        const description = config.description || this.appDescription;
        const publishHandle = config.twitter_publisher_handle || this.twitter_publisher_handle;
        const image = config.image || this.appImage;
        const title = config.title ? `${config.title} - ${this.appTitle}` : this.appTitle;
        this.title.setTitle(title);

        const tags = [
            { name: 'description', content: description },
            { name: 'theme-color', content: this.appColor },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: image },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:site', content: publishHandle },

            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black translucent' },
            { name: 'apple-mobile-web-app-title', content: title },
            { name: 'apple-touch-startup-image', content: image },
            { name: 'apple-touch-icon', content: image },

            { name: 'og:title', content: title},
            { name: 'og:type', content: title},
            { name: 'og:description', content: description},
            { name: 'og:image', content: image},
            { name: 'og:url', content: this.baseUrl},
        ]

        // <!--  Non-Essential, But Recommended -->

        // <meta property="og:site_name" content="European Travel, Inc.">
        // <meta property="og:price:amount" content="15.00" />
        // <meta property="og:price:currency" content="USD" />
        // <meta name="twitter:image:alt" content="Alt text for image">
        // <meta name="twitter:image:src" content="http://www.example.com/image.jpg">
        // <meta property="fb:admins" content="Facebook numeric ID" />

        // <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
        // <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" />
        // <meta property="article:section" content="Article Section" />
        // <meta property="article:tag" content="Article Tag" />


        //Product descriptions
        // <meta name="twitter:data1" content="$3">
        // <meta name="twitter:label1" content="Price">
        // <meta name="twitter:data2" content="Black">
        // <meta name="twitter:label2" content="Color">

        // <!--  Non-Essential, But Required for Analytics -->

        // <meta property="fb:app_id" content="your_app_id" />
        // <meta name="twitter:site" content="@website-username">
        tags.forEach(tag => this.meta.updateTag(tag));
    }
}
