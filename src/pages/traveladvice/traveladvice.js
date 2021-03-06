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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TraveladvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TraveladvicePage = /** @class */ (function () {
    function TraveladvicePage(navCtrl, navParams, restProvider, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.storage = storage;
        this.adviceArray = [];
        this.storage.get('rutdata').then(function (getdata) {
            console.log('getdata ' + getdata);
            _this.getdata = getdata;
        });
        this.storage.get('companyLogo').then(function (getcompanyLogo) {
            console.log('getcompanyLogo', getcompanyLogo);
            _this.getcompanyLogo = getcompanyLogo;
            console.log('this.getcompanyLogo', _this.getcompanyLogo);
        });
        this.getTravelAdviceData();
        this.storage.get("isLogin").then(function (resulst) {
            console.log("results travel advice status", resulst);
            if (resulst) {
                _this.corpocustoTravel = true;
                _this.travelAgencyTravel = false;
            }
            else {
                _this.corpocustoTravel = false;
                _this.travelAgencyTravel = true;
            }
        });
    }
    TraveladvicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TraveladvicePage');
    };
    TraveladvicePage.prototype.goback = function () {
        this.navCtrl.push("MenuPage");
    };
    TraveladvicePage.prototype.getTravelAdviceData = function () {
        var _this = this;
        this.restProvider.getTravelAdvice()
            .then(function (data) {
            var serviceData = data['consejosviaje'];
            _this.adviceArray = serviceData;
        });
    };
    TraveladvicePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-traveladvice',
            templateUrl: 'traveladvice.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider, Storage])
    ], TraveladvicePage);
    return TraveladvicePage;
}());
export { TraveladvicePage };
//# sourceMappingURL=traveladvice.js.map