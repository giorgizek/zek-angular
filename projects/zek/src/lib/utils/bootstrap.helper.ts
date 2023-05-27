import { AlertType } from '../models/alert-type';
import { StringHelper } from './string-helper';

export enum ComponentType {
    Primary = 1,
    // Secondary,
    Success,
    Delete,
    //Danger,
    Warning,
    Info,
    // Light,
    // Dark,
}

export enum Color {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Warning = 5,
    Info = 6,
    Dark = 8,
}

export class BootstrapHelper {
    static cssColor(color?: Color | null) {
        switch (color) {
            case Color.Primary:
                return 'bg-primary text-white'
            case Color.Secondary:
                return 'bg-secondary text-white';
            case Color.Success:
                return 'bg-success text-white';
            case Color.Danger:
                return 'bg-danger text-white';
            case Color.Warning:
                return 'bg-warning text-dark';
            case Color.Info:
                return 'bg-info text-dark';
            case Color.Dark:
                return 'bg-dark text-white';
            default:
                return '';
        }
    }
    static cssIcon(type: ComponentType): string | null {
        if (!type) {
            return null;
        }

        switch (type) {
            case ComponentType.Delete:
                return 'fa-solid fa-trash';

            // case ComponentType.Danger:
            case ComponentType.Warning:
                return 'fa-solid fa-triangle-exclamation';

            case ComponentType.Info:
                return 'fa-solid fa-circle-info';

            default:
                return 'fa-solid fa-check';
        }
    }

    static cssButton(type: ComponentType): string {
        switch (type) {
            case ComponentType.Primary:
            // case ComponentType.Secondary:
            case ComponentType.Success:
            // case ComponentType.Danger:
            case ComponentType.Warning:
            case ComponentType.Info:
                // case ComponentType.Light:
                // case ComponentType.Dark:
                return `btn-${ComponentType[type].toLowerCase()}`;

            case ComponentType.Delete:
                return 'btn-danger';
            default:
                return 'btn-secondary';
        }
    }




    static getAlertType(type?: string | null): AlertType | null {
        if (!type) return null;

        let v = StringHelper.firstUpper(type);
        if (!v)
            return null;

        var enumValue = (<any>AlertType)[v];
        if (!enumValue)
            return null;


        return enumValue;
    }
    static cssAlert(type?: AlertType | null): string {
        switch (type) {
            case AlertType.Primary:
                return 'alert-primary';
            case AlertType.Secondary:
                return 'alert-secondary';
            case AlertType.Success:
                return 'alert-success';
            case AlertType.Danger:
                return 'alert-danger';
            case AlertType.Warning:
                return 'alert-warning';
            case AlertType.Info:
                return 'alert-info';
            case AlertType.Light:
                return 'alert-light';
            case AlertType.Dark:
                return 'alert-dark';
            default:
                return 'alert-secondary';
        }
    }
    static cssAlertIcon(type?: AlertType | null): string {
        switch (type) {
            case AlertType.Success:
                return 'fa-solid fa-circle-check';
            case AlertType.Danger:
                return 'fa-solid fa-circle-xmark';
            case AlertType.Warning:
                return 'fa-solid fa-circle-exclamation';
            case AlertType.Info:
                return 'fa-solid fa-circle-info';
            default:
                return '';
        }
    }
}