var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Loader } from "../../providers/loader/loader";
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PasswordPage = /** @class */ (function () {
    function PasswordPage(navCtrl, navParams, plt, loader, formBuilder, keyboard, restProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.loader = loader;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.restProvider = restProvider;
        this.storage = storage;
        this.rut = this.navParams.get('rut');
        this.passwordloginForm = formBuilder.group({
            password: ['', Validators.compose([Validators.required, Validators.required])]
        });
        if (this.plt.is('ios')) {
            // This will only print when on iOS
            console.log('I am an iOS device!');
            this.headerdisplay = true;
        }
        else if (this.plt.is('android')) {
            this.headerdisplay = false;
            console.log('I am an android device!');
        }
    }
    PasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordPage');
    };
    PasswordPage.prototype.onChange = function () {
        if (this.passwordloginForm.value.password.length > -1) {
            this.error = '';
        }
    };
    PasswordPage.prototype.passwordlogin = function () {
        var _this = this;
        this.error = '';
        this.loader.show('Please Wait');
        var clave = this.passwordloginForm.value.password;
        if (this.passwordloginForm.value.password == '') {
            this.error = "please enter your Password";
        }
        else {
            this.restProvider.getClaveData(this.rut, clave)
                .then(function (data) {
                _this.appID = data['appid'];
                _this.storage.set('appId', _this.appID);
                _this.empresaID = data['idempresa'];
                _this.storage.set('empresaId', _this.empresaID);
                if (data['error']) {
                    _this.error = data['error'];
                    _this.loader.hide();
                }
                else {
                    _this.storage.set('isLogin', true);
                    _this.storage.set('RUT', data['RUT']);
                    _this.JID = data['JID'];
                    _this.storage.set('senderJID', _this.JID);
                    _this.loader.hide();
                    _this.navCtrl.push("MenuPage");
                }
            });
        }
    };
    PasswordPage.prototype.resetpassword = function () {
        this.navCtrl.push("ResetpasswordPage");
    };
    PasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-password',
            templateUrl: 'password.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, Loader,
            FormBuilder, Keyboard, RestProvider, Storage])
    ], PasswordPage);
    return PasswordPage;
}());
export { PasswordPage };
//# sourceMappingURL=password.js.map