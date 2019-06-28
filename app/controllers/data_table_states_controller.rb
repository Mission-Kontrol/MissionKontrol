class DataTableStatesController < ApplicationController
  def load
    dts = DataTableState.find_by_table(params[:table])
    respond_to do |format|
      format.js {
        render json: dts.state_as_json
      }
    end
  end

  def save
    dts = DataTableState.where(table: params[:table]).first_or_create
    dts.state = state_params.to_h
    dts.table = params[:table]
    dts.save

    respond_to do |format|
      format.js {
        render json: dts.state_as_json
      }
    end
  end

  private

  def state_params
    params.require(:state).permit!
  end
end
