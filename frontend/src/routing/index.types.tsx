import { LoadableComponent } from "@loadable/component";

export type SiteMapType = {
    [key: string]: {
        path: string;
        Component: React.ComponentType | LoadableComponent<unknown> | any;
        children?: SiteMapType;
        relativePath?: string;
    };
};