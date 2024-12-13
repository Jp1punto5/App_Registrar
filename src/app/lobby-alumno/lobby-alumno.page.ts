import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { BrowserQRCodeReader } from '@zxing/browser';
import { ConsumoAPIService } from '../service/consumo-api.service';



@Component({
  selector: 'app-lobby-alumno',
  templateUrl: './lobby-alumno.page.html',
  styleUrls: ['./lobby-alumno.page.scss'],
})
export class LobbyAlumnoPage implements OnInit, OnDestroy {

  constructor(private router: Router , private alerta: AlertController, private validar : AuthService, private consumoApi : ConsumoAPIService ) {}
 
  saludo : String = ''; // este sera el nombre del estudiante
  codeReader: BrowserQRCodeReader = new BrowserQRCodeReader();
  videoElement: HTMLVideoElement | null = null;
  activeDeviceId: string | null = null;


  

  async cerrarSesion()
  {
     this.validar.Eliminar_user();
     console.log(this.validar.getUserData());
     console.log(this.validar.Validar_user());
     this.router.navigate(['/home']);
 
  }

  //preparar la camara para el scaneo


 async manipularQR( data: string)
  {
    const [curso,codigo,seccion] = data.split(',');

    console.log('curso : ',curso);
    console.log('codigo del curso: ',codigo);
    console.log('seccion del curso :',seccion);

    const correo_aa = this.validar.getUserData().correo;
    // se utiliza la api para registrar asistencia
    this.consumoApi.setAsistencia(codigo,seccion,correo_aa).subscribe
    (
      (data: any) => 
      {
          console.log('se registro la asistencia correctamente' + data.message);
          this.mostrarAlerta('asistencia registrada!');
          return
      },
      (error:  any) =>
      {
        const errorm = error?.error?.message || 'Error inesperado al registrar la asistencia';
        console.log('error: ' + errorm );

        this.mostrarAlerta(errorm);
      }

    );
  }
  
  
  ngOnInit() {

    this.saludo = this.validar.getUserData().nombre;
    this.videoElement = document.getElementById('video') as HTMLVideoElement;


  }

  async startQRScanner() {
    if (!this.videoElement) {
      console.error('No se encontró el elemento de vídeo');
      return;
    }
  
    try {
      const devices = await BrowserQRCodeReader.listVideoInputDevices();
      if (devices.length > 0) {
        const deviceId = devices[0].deviceId; // Usar el primer dispositivo encontrado
        await this.codeReader.decodeFromVideoDevice(
          deviceId,
          this.videoElement,
          (result, error, controls) => {
            if (result) {
              console.log('Código escaneado:', result.getText());
              this.manipularQR(result.getText()); // Procesar el código QR
              controls.stop(); // Detener el escáner después de leer el código
            }
  
            if (error) {
              console.warn('Error de escaneo:', error.message);
            }
          }
        );
      } else {
        await this.mostrarAlerta('No se encontraron cámaras disponibles.');
      }
    } catch (error) {
      console.error('Error al iniciar el escáner:', error);
      await this.mostrarAlerta('Error al iniciar el escáner.');
    }
  }
  
  stopQRScanner() {
    if (this.activeDeviceId) {
      // Detener el uso de la cámara y limpiar los recursos
      this.codeReader.decodeFromVideoDevice(undefined, this.videoElement || undefined, () => {});
      this.activeDeviceId = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null; // Limpiar el vídeo
    }
  }

  async mostrarAlerta(mensaje:string)
  {
     const alert = await this.alerta.create({

       header: 'Atencion',
       message: mensaje,
       buttons:['OK']
     });

     await alert.present();
  }

  ngOnDestroy() {
    // Asegurarse de liberar recursos cuando se destruye el componente
    this.stopQRScanner();
  }



  

}
