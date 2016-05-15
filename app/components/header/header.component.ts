import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {UserService} from '../common/user.service'
@Component({
	selector: 'header-component',
	templateUrl: 'app/components/header/header.html',
	directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {
	public signUp = {
		firstName:'',
		lastName:'',
		email:'',
		password:'',
		confirmPassword:''
	}
	constructor(public userService: UserService){
		
	}
	emailSignUp(){
		if( this.signUp.password !== this.signUp.confirmPassword ){
			alert("Passwords do not match.");
			this.signUp.password = ''; this.signUp.confirmPassword = '';
			return;
		}
		if(this.signUp.firstName === '' || this.signUp.lastName === '' || this.signUp.email === ''){
			alert("invalid details in form.");
			return;
		}
		this.userService.userSignup(this.signUp)
	}
}