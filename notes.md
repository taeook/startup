# CS 260 Notes

[My startup - ReviewHub](https://rewviewhub.link)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## EC2 (Elastic Compute Cloud)
- **Purpose**: EC2 is a web service provided by AWS that allows users to rent virtual servers, known as instances, to run applications on the cloud.
- **Key Features**: Scalability, flexibility, and a variety of instance types to suit different workloads.
- **Use Case**: Hosting websites, applications, and services that require reliable and scalable computing power.

## Route 53
- **Purpose**: Route 53 is a scalable and highly available Domain Name System (DNS) web service by AWS.
- **Key Features**: Domain registration, DNS routing, and health checking.
- **Use Case**: Managing domain names and routing end-user requests to AWS services like EC2 instances.

## HTTPS
- **Purpose**: HTTPS (Hypertext Transfer Protocol Secure) is an extension of HTTP used for secure communication over a computer network.
- **Key Features**: Encryption, data integrity, and authentication using SSL/TLS certificates.
- **Use Case**: Securing data transmission between clients and servers, such as web browsers and websites.

## Caddyfile
- **Purpose**: A configuration file used by Caddy, a web server known for its simplicity and automatic HTTPS capabilities.
- **Key Features**: Easy configuration syntax, automatic HTTPS, and support for various web technologies.
- **Use Case**: Configuring web servers to serve websites with minimal setup, including automatic handling of HTTPS.

## How They Are Related(EC2, Route 53, HTTPS, Caddyfile)
1. **Hosting a Secure Website**:
   - **EC2**: You can host your website or application on an EC2 instance.
   - **Route 53**: Use Route 53 to manage your domain name and route traffic to your EC2 instance.
   - **HTTPS**: Secure your website by enabling HTTPS, ensuring data is encrypted between the client and server.
   - **Caddyfile**: Use a Caddyfile to configure the Caddy web server on your EC2 instance, which can automatically manage HTTPS certificates and serve your website securely.

By combining these services, you can efficiently host and manage a secure, scalable web application on AWS.

## HTML

I already learned about HTML so this part was not that hard for me.

Reviewing HTML tags and structure were helpful though.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
