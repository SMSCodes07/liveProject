import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // Variable para el formulario
  registerForm: FormGroup;
  // Variable para el formulario
  constructor(private router: Router, private userAuth: AngularFireAuth, private realtimeDatabase: AngularFireDatabase,
              private nativeToast: ToastController, private formBuiler: FormBuilder) { }

  ngOnInit() {
    // Inicializando formulario de registro
    this.registerForm = this.formBuiler.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    // Inicializando formulario de registro
  }
  // Funcion para crear un nuevo usuario en el sistema
  async createUser() {
    // Extrayendo datos del formulario
    const userName = this.registerForm.value.userName;
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;
    // Extrayendo datos del formulario
    // Creando usuario en el sistema
    await this.userAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
    // Creando usuario en el sistema
    // En caso de un registro exitoso, se ejecutara este bloque de codigo
    .then(async () => {
      // Actualizando el nombre del usuario
      this.userAuth.auth.onAuthStateChanged((userData) => {
        userData.updateProfile({
          displayName: userName
        });
      });
      // Actualizando el nombre del usuario
      // Extrayendo userID
      const userID = this.userAuth.auth.currentUser.uid;
      // Extrayendo userID
      // Creando registro en la base de datos
      await this.realtimeDatabase.database.ref('liveAppPlatform/users/' + userID + '/').set({
        userName: userName,
        userEmail: userEmail,
        userID: userID,
      })
      // Creando registro en la base de datos
      // En caso de un registro exitoso en la base de datos, le avisamos al usuario que todo esta OK
      .then(async () => {
        const registerToast = await this.nativeToast.create({
          header: 'Autentticacion',
          message: 'Si se pudo, con Fé',
          position: 'bottom',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                // Vamos pal login
                this.router.navigate(['/login']);
                // Vamos pal login
              }
            }
          ]
        });
        registerToast.present();
      })
      // En caso de un registro exitoso en la base de datos, le avisamos al usuario que todo esta OK
    });
    // En caso de un registro exitoso, se ejecutara este bloque de codigo
  }
  // Funcion para crear un nuevo usuario en el sistema
}
