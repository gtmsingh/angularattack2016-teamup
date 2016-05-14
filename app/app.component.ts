declare var System: any;
import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, AsyncRoute} from '@angular/router-deprecated';
import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component'
import {Http, HTTP_PROVIDERS} from '@angular/http';


@Component({
	selector: 'main-component',
	templateUrl: 'app/mainBody.html',
	viewProviders: [HTTP_PROVIDERS],
	directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent]
}) 
@RouteConfig([
	new AsyncRoute({
		path: '/',
		name: 'Home',
		loader: () => {
			return System.import('compiled/components/home/home.component.js')
				.then(m => m.HomeComponent);
		}
	}),
	new AsyncRoute({
		path: '/create-event',
		name: 'CreateEvent',
		loader: () => {
			return System.import('compiled/components/createEvent/createEvent.component.js')
				.then(m => m.CreateEventComponent);
		}
	})
])
export class AppComponent {
	public people;
	constructor(http: Http) {
		http.get('people.json')
			// Call map on the response observable to get the parsed people object
			.map(res => res.json())
			// Subscribe to the observable to get the parsed people object and attach it to the
			// component
			.subscribe(people => this.people = people);
	}

}