import Base, {ResourcePath} from '../../base-rest-resource';
import {SessionInterface} from '../../auth/session/types';
import {ApiVersion} from '../../base-types';

import {Currency} from './currency';

interface FindArgs {
  session: SessionInterface;
  id: number | string;
}
interface AllArgs {
  [key: string]: unknown;
  session: SessionInterface;
  since_id?: unknown;
  last_id?: unknown;
  status?: unknown;
  initiated_at?: unknown;
}

export class Dispute extends Base {
  public static API_VERSION = ApiVersion.April21;

  protected static NAME = 'dispute';
  protected static PLURAL_NAME = 'disputes';
  protected static HAS_ONE: {[key: string]: typeof Base} = {
    currency: Currency
  };
  protected static HAS_MANY: {[key: string]: typeof Base} = {};
  protected static PATHS: ResourcePath[] = [
    {http_method: "get", operation: "get", ids: [], path: "shopify_payments/disputes.json"},
    {http_method: "get", operation: "get", ids: ["id"], path: "shopify_payments/disputes/<id>.json"}
  ];

  public static async find(
    {
      session,
      id
    }: FindArgs
  ): Promise<Dispute | null> {
    const result = await Dispute.baseFind({
      session: session,
      urlIds: {id: id},
      params: {},
    });
    return result ? result[0] as Dispute : null;
  }

  public static async all(
    {
      session,
      since_id = null,
      last_id = null,
      status = null,
      initiated_at = null,
      ...otherArgs
    }: AllArgs
  ): Promise<Dispute[]> {
    const response = await Dispute.baseFind({
      session: session,
      urlIds: {},
      params: {since_id: since_id, last_id: last_id, status: status, initiated_at: initiated_at, ...otherArgs},
    });

    return response as Dispute[];
  }

  public amount: string | null;
  public currency: Currency | null | {[key: string]: any};
  public evidence_due_by: string | null;
  public evidence_sent_on: string | null;
  public finalized_on: string | null;
  public id: number | null;
  public network_reason_code: number | null;
  public order_id: number | null;
  public reason: string | null;
  public status: string | null;
  public type: string | null;
}
