/**
 * Title
 * 1-eSIM self-care API Specification
 *
 * The version of the OpenAPI document: 1.0.0
 */

export interface UsageInfo {
    /**
     * Offer name
     */
    name?: string;
    /**
     * Total usage
     */
    total?: number;
    /**
     * Used usage
     */
    used?: number;
    /**
     * Remaining usage
     */
    remaining?: number;
    /**
     * Unit of usage
     */
    unitType?: UsageInfo.UnitTypeEnum;
}
export namespace UsageInfo {
    export type UnitTypeEnum = 'KB' | 'MB' | 'GB' | 'TB';
    export const UnitTypeEnum = {
        Kb: 'KB' as UnitTypeEnum,
        Mb: 'MB' as UnitTypeEnum,
        Gb: 'GB' as UnitTypeEnum,
        Tb: 'TB' as UnitTypeEnum
    };
}


