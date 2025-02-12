import { Commit_Diff_Schema } from "./commit-diff.schema";
import { Metadata_Schema } from "./metadata.schema";

type Commit_Create_Schema<Type, ExtraProps, Data> = Metadata_Schema &
  ExtraProps & {
    type: Type;
    data: Data;
  };

type Commit_Update_Schema<Type, ExtraProps, Data> = Metadata_Schema &
  ExtraProps & {
    type: Type;
    diff: Commit_Diff_Schema<Data>;
  };

type Commit_Delete_Schema<Type, ExtraProps> = Metadata_Schema &
  ExtraProps & {
    type: Type;
  };

export type Commit_CUD<CreateType, UpdateType, DeleteType, ExtraProps, Data> =
  | Commit_Create_Schema<CreateType, ExtraProps, Data>
  | Commit_Update_Schema<UpdateType, ExtraProps, Data>
  | Commit_Delete_Schema<DeleteType, ExtraProps>;
