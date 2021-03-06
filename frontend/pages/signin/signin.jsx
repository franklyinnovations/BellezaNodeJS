import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from 'components/Loader/Loader'
import queryString from 'query-string'
import { resetErrors } from 'actions/errors'
import {
	userSignUp,
	userLogin,
	validateUser,
} from 'actions/user'


@connect( store => {
	return {
		user: store.user,
		errors: store.errors
	}
})
export default class Signin extends React.Component {
	constructor(props){
		super(props)

		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
		this.handleInputBlur = this.handleInputBlur.bind(this)
		this.handleInputFocus = this.handleInputFocus.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	componentWillUnmount() {
		this.props.dispatch(resetErrors())
	}

	handleLogin(event){
		event.preventDefault()
		this.props.dispatch(resetErrors())
		let elements = event.target.elements
		let formData = new FormData()
		formData.append('email', elements.login.value)
		formData.append('password', elements.password.value)

		this.props.dispatch(userLogin(formData))
			.then()
			.catch(this.handleError)
	}

	handleSignUp(event){
		event.preventDefault()
		this.props.dispatch(resetErrors())
		let elements = event.target.elements
		let formData = new FormData()
		formData.append('email', elements.email.value)
		formData.append('password', elements.password.value)
		formData.append('first_name', elements.first_name.value)
		formData.append('last_name', elements.last_name.value)

		this.props.dispatch(userSignUp(formData))
			.then()
			.catch(this.handleError)
	}

	handleInputBlur(event){
		let fieldData = {}
		fieldData[event.target.name] = event.target.value

		this.props.dispatch(validateUser(fieldData))
			.then()
			.catch(this.handleError)
	}

	handleInputFocus(event){
		event.target.value=''
		this.props.dispatch(resetErrors(event.target.name))
	}

	handleError(response){

	}

	render () {
		const {
			user,
			errors,
			history
		} = this.props

		const parse = queryString.parse(history.location.search)
		if(parse.redirect && user.get('token')){
			return <Redirect to={`${parse.redirect}`}/>
		}

		if(user.get('token')){
			return <Redirect to={`/user/${user.get('id')}`}/>
		}

		return (
			<main>
				<h3>Iniciar Sesión o Crea Nuevo Usuario</h3>

				<div className='grid-wrap around'>
					<LoginFrom
						errors={errors}
						onRequestSubmit={this.handleLogin}
						onRequestBlur={this.handleInputBlur}
						onRequestFocus={this.handleInputFocus}/>

					<SignUpForm
						errors={errors}
						onRequestSubmit={this.handleSignUp}
						onRequestBlur={this.handleInputBlur}
						onRequestFocus={this.handleInputFocus}/>
				</div>
			</main>
		)
	}
}

const LoginFrom = props => {

	return (
		<section className='col-5 col-xs-10'>
			<h4 className='h-underline'>Iniciar Sesión</h4>
			<h5 className='sub-text'>Si usted ya tiene una cuenta, ingrese aquí.</h5>
			<form className='main-form' onSubmit={props.onRequestSubmit}>
				<label htmlFor='email'>Email</label>
				{props.errors.get('login') && <div className='error-div'>{props.errors.get('login')}</div>}
				<input type='text' name='login'
					onFocus={props.onRequestFocus}/>

				<label htmlFor='password'>Contraseña <Link to='/password/forgot' className='sub-text light' style={{float: 'right'}}>(Olvidó su Contraseña)</Link></label>
				<input type='password' name='password'/>

				<Loader>
					<input className='submit full' type='submit' value='Ingresar'/>
				</Loader>
			</form>
		</section>
	)
}

const SignUpForm = props => {

	return (
		<section className='col-5 col-xs-10'>
			<h4 className='h-underline'>Crea Nuevo Usuario</h4>
			<h5 className='sub-text'>
				Al crear una cuenta en nuestra tienda, usted será capaz de moverse a través del proceso
        de pago más rápido, guardar múltiples direcciones de envío.
			</h5>
			<form className='main-form' onSubmit={props.onRequestSubmit} autoComplete='dont you dare chrome'>

				<label htmlFor='first_name'>Nombre</label>
				{props.errors.get('first_name') && <div className='error-div'>{props.errors.get('first_name')}</div>}
				<input type='text' name='first_name'
					onBlur={props.onRequestBlur}
					onFocus={props.onRequestFocus}/>

				<label htmlFor='last_name'>Apellido</label>
				{props.errors.get('last_name') && <div className='error-div'>{props.errors.get('last_name')}</div>}
				<input type='text' name='last_name'
					onBlur={props.onRequestBlur}
					onFocus={props.onRequestFocus}/>

				<label htmlFor='email'>Email</label>
				{props.errors.get('email') && <div className='error-div'>{props.errors.get('email')}</div>}
				<input type='text' name='email'
					autoComplete='dont you dare chrome'
					defaultValue=' '
					onBlur={props.onRequestBlur}
					onFocus={props.onRequestFocus}/>

				<label htmlFor='password'>Contraseña </label>
				{props.errors.get('password') && <div className='error-div'>{props.errors.get('password')}</div>}
				<input type='password' name='password'
					autoComplete='dont you dare chrome'
					defaultValue=''
					onBlur={props.onRequestBlur}
					onFocus={props.onRequestFocus}/>

				<Loader>
					<input className='submit full' type='submit' value='Crear'/>
				</Loader>

			</form>
		</section>
	)
}
