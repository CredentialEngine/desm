# frozen_string_literal: true

###
# @description: Place all the actions related to users
###
class UsersController < ApplicationController
  before_action :set_user

  ###
  # @description: Lists all the users with its organizations
  ###
  def index
    @users = User.all

    if @users
      render json: {
        users: @users
      }
    else
      render json: {status: 500}, status: :internal_server_error
    end
  end

  ###
  # @description: Udates the attributes of a user
  ###
  def update
    if @user.update(permitted_params)
      render json: {
        user: @user
      }
    else
      render json: {status: 500}, status: :internal_server_error
    end
  end

  ###
  # @description: Removes a user from the database
  ###
  def destroy
    if @user.destroy!
      render json: {
        status: :removed
      }
    else
      render json: {status: 500}, status: :internal_server_error
    end
  end

  private

  ###
  # @description: Grab the user to make it available in the public methods
  # @return [ActiveRecord]
  ###
  def set_user
    user
  end

  ###
  # @description: Get the current user
  # @return [ActiveRecord]
  ###
  def user
    @user = @user || params[:id].present? ? User.find(params[:id]) : User.first
  end

  ###
  # @description: Clean params
  # @return [ActionController::Parameters]
  ###
  def permitted_params
    params.require(:user).permit(:email, :fullname)
  end
end