---
layout: page
title: About
permalink: /about/
---

<div class="row">
    <div class="col-md-6">
        <div class="card card-block">
            <h4 class="card-title">Contact</h4>
            <p class="card-text">
                <ul class="fa-ul">
                  <li><i class="fa-li fa fa-envelope fa-lg"></i>{{ site.email }}</li>

                  {% if site.github_username %}
                      <li><i class="fa-li fa fa-github fa-lg"></i><a href="https://github.com/{{ site.github_username }}">{{ site.github_username }}</a></li>
                  {% endif %}

                  {% if site.linkedin_username %}
                      <li><i class="fa-li fa fa-linkedin fa-lg"></i><a href="https://nl.linkedin.com/in/{{ site.linkedin_username }}">{{ site.linkedin_username }}</a></li>
                  {% endif %}

                  {% if site.stackoverflow_page %}
                      <li><i class="fa-li fa fa-stack-overflow fa-lg"></i><a href="http://stackoverflow.com/users/{{ site.stackoverflow_page }}">{{ site.stackoverflow_page }}</a></li>
                  {% endif %}
                </ul>
            </p>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h4>Internships</h4>
            <p class="card-text">
                some text here
            </p>
        </div>
    </div>
</div>
