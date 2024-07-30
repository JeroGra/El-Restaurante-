import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MemoriaComponent } from './componentes/juegos/juego_20_desc/memoria/memoria.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splashscreen',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./paginas/registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./paginas/splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },
  {
    path: 'solicitar-mesa',
    loadChildren: () => import('./paginas/solicitar-mesa/solicitar-mesa.module').then( m => m.SolicitarMesaPageModule)
  },
  {
    path: 'aprobacion-clientes',
    loadChildren: () => import('./paginas/aprobacion-clientes/aprobacion-clientes.module').then( m => m.AprobacionClientesPageModule)
  },
  {
    path: 'fila-clientes',
    loadChildren: () => import('./paginas/fila-clientes/fila-clientes.module').then( m => m.FilaClientesPageModule)
  },
  {
    path: 'mesa-cliente',
    loadChildren: () => import('./paginas/mesa-cliente/mesa-cliente.module').then( m => m.MesaClientePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./paginas/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'listado-pedidos-mozo',
    loadChildren: () => import('./paginas/listado-pedidos-mozo/listado-pedidos-mozo.module').then( m => m.ListadoPedidosMozoPageModule)
  },
  {
    path: 'pedidos-cocina',
    loadChildren: () => import('./paginas/pedidos-cocina/pedidos-cocina.module').then( m => m.PedidosCocinaPageModule)
  },
  {
    path: 'pedidos-bar',
    loadChildren: () => import('./paginas/pedidos-bar/pedidos-bar.module').then( m => m.PedidosBarPageModule)
  },
  {
    path: 'ver-encuestas',
    loadChildren: () => import('./paginas/ver-encuestas/ver-encuestas.module').then( m => m.VerEncuestasPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./paginas/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'solicitar-pago-qr',
    loadChildren: () => import('./paginas/solicitar-pago-qr/solicitar-pago-qr.module').then( m => m.SolicitarPagoQrPageModule)
  },
  {
    path: 'juegos',
    loadChildren: () => import('./paginas/juegos/juegos.module').then( m => m.JuegosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
